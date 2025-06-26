<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Risposta per metodo OPTIONS (CORS Preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$host = "localhost";
$user = "tasksks_uid_db";
$pass = "3uuhN12~";
$db   = "tasksks_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connessione al DB fallita: " . $conn->connect_error]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

function parseId($v) {
    return (is_numeric($v) && intval($v) > 0) ? (int)$v : null;
}

// Funzione helper per errori
function errorResponse($code, $message) {
    http_response_code($code);
    echo json_encode(["error" => $message]);
    exit;
}

if ($method === 'GET') {
    // Prendo progettoId dalla query string
    parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $q);
    $progettoId = parseId($q['progettoId'] ?? null);

    if (!$progettoId) {
        errorResponse(400, "Parametro progettoId mancante o non valido");
    }

    $stmt = $conn->prepare("SELECT * FROM `Task` WHERE progettoId = ? ORDER BY id ASC");
    if (!$stmt) {
        errorResponse(500, "Prepare fallito: " . $conn->error);
    }
    $stmt->bind_param("i", $progettoId);

    if (!$stmt->execute()) {
        $stmt->close();
        errorResponse(500, "Execute fallito: " . $stmt->error);
    }

    $result = $stmt->get_result();
    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        $row['done'] = (bool)$row['done'];
        $tasks[] = $row;
    }
    $stmt->close();

    echo json_encode($tasks);
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        errorResponse(400, "JSON non valido o mancante");
    }

    $nome       = trim($data['nome'] ?? '');
    $priorita   = trim($data['priorita'] ?? '');
    $progettoId = parseId($data['progettoId'] ?? null);
    $done       = isset($data['done']) ? (int)(bool)$data['done'] : 0;

    if ($nome === '' || $priorita === '' || !$progettoId) {
        errorResponse(400, "Campi mancanti o non validi (nome, priorita, progettoId richiesti)");
    }

    $stmt = $conn->prepare("INSERT INTO `Task` (nome, priorita, progettoId, done) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        errorResponse(500, "Prepare fallito: " . $conn->error);
    }
    $stmt->bind_param("ssii", $nome, $priorita, $progettoId, $done);

    if (!$stmt->execute()) {
        $stmt->close();
        errorResponse(500, "Insert fallito: " . $stmt->error);
    }

    $taskId = $stmt->insert_id;
    $stmt->close();

    echo json_encode([
        "id"         => $taskId,
        "nome"       => $nome,
        "priorita"   => $priorita,
        "progettoId" => $progettoId,
        "done"       => (bool)$done
    ]);
    exit;
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        errorResponse(400, "JSON non valido o mancante");
    }

    $id   = parseId($data['id'] ?? null);
    $done = isset($data['done']) ? (int)(bool)$data['done'] : null;

    if (!$id || $done === null) {
        errorResponse(400, "ID task non valido o campo done mancante");
    }

    $stmt = $conn->prepare("UPDATE `Task` SET done = ? WHERE id = ?");
    if (!$stmt) {
        errorResponse(500, "Prepare fallito: " . $conn->error);
    }
    $stmt->bind_param("ii", $done, $id);

    if (!$stmt->execute()) {
        $stmt->close();
        errorResponse(500, "Update fallito: " . $stmt->error);
    }
    $stmt->close();

    echo json_encode(["id" => $id, "done" => (bool)$done]);
    exit;
}

if ($method === 'DELETE') {
    parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $q);
    $id = parseId($q['id'] ?? null);

    if (!$id) {
        errorResponse(400, "ID task non valido");
    }

    // Verifico che il task esista
    $check = $conn->prepare("SELECT id FROM `Task` WHERE id = ?");
    if (!$check) {
        errorResponse(500, "Prepare fallito: " . $conn->error);
    }
    $check->bind_param("i", $id);
    if (!$check->execute()) {
        $check->close();
        errorResponse(500, "Execute fallito: " . $check->error);
    }
    $res = $check->get_result();
    if ($res->num_rows === 0) {
        $check->close();
        errorResponse(404, "Task non trovata");
    }
    $check->close();

    $stmt = $conn->prepare("DELETE FROM `Task` WHERE id = ?");
    if (!$stmt) {
        errorResponse(500, "Prepare fallito: " . $conn->error);
    }
    $stmt->bind_param("i", $id);

    if (!$stmt->execute()) {
        $stmt->close();
        errorResponse(500, "Delete fallito: " . $stmt->error);
    }
    $stmt->close();

    echo json_encode(["message" => "Task eliminata con successo"]);
    exit;
}

http_response_code(405);
echo json_encode(["error" => "Metodo non supportato"]);
exit;
?>
