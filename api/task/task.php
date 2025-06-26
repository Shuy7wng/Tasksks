<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

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
  return is_numeric($v) ? (int)$v : null;
}

if ($method === 'GET') {
  parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $q);
  $progettoId = parseId($q['progettoId'] ?? null);
  if (!$progettoId) {
    http_response_code(400);
    echo json_encode(["error" => "progettoId mancante o non valido"]);
    exit;
  }

  $stmt = $conn->prepare("SELECT * FROM `Task` WHERE progettoId = ? ORDER BY id ASC");
  if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Prepare fallito: " . $conn->error]);
    exit;
  }
  $stmt->bind_param("i", $progettoId);
  $stmt->execute();
  $result = $stmt->get_result();
  if ($result === false) {
    http_response_code(500);
    echo json_encode(["error" => "Execute fallito: " . $stmt->error]);
    exit;
  }

  $tasks = [];
  while ($row = $result->fetch_assoc()) {
    $row['done'] = (bool)$row['done'];
    $tasks[] = $row;
  }

  echo json_encode($tasks);
  exit;
}

if ($method === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);
  $nome       = trim($data['nome'] ?? '');
  $priorita   = trim($data['priorita'] ?? '');
  $progettoId = parseId($data['progettoId'] ?? null);
  $done       = isset($data['done']) ? (int)(bool)$data['done'] : 0;

  if ($nome === '' || $priorita === '' || !$progettoId) {
    http_response_code(400);
    echo json_encode(["error" => "Campi mancanti o non validi"]);
    exit;
  }

  $stmt = $conn->prepare("INSERT INTO `Task` (nome, priorita, progettoId, done) VALUES (?, ?, ?, ?)");
  if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Prepare fallito: " . $conn->error]);
    exit;
  }
  $stmt->bind_param("ssii", $nome, $priorita, $progettoId, $done);
  if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Insert fallito: " . $stmt->error]);
    exit;
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
  $id   = parseId($data['id'] ?? null);
  $done = isset($data['done']) ? (int)(bool)$data['done'] : null;

  if (!$id || $done === null) {
    http_response_code(400);
    echo json_encode(["error" => "ID task non valido o campo done mancante"]);
    exit;
  }

  $stmt = $conn->prepare("UPDATE `Task` SET done = ? WHERE id = ?");
  if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Prepare fallito: " . $conn->error]);
    exit;
  }
  $stmt->bind_param("ii", $done, $id);
  if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Update fallito: " . $stmt->error]);
    exit;
  }
  $stmt->close();

  echo json_encode(["id" => $id, "done" => (bool)$done]);
  exit;
}

if ($method === 'DELETE') {
  parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $q);
  $id = parseId($q['id'] ?? null);

  if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "ID task non valido"]);
    exit;
  }
  $check = $conn->prepare("SELECT id FROM `Task` WHERE id = ?");
  $check->bind_param("i", $id);
  $check->execute();
  $res = $check->get_result();
  if ($res->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["error" => "Task non trovata"]);
    exit;
  }
  $check->close();

  $stmt = $conn->prepare("DELETE FROM `Task` WHERE id = ?");
  if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Prepare fallito: " . $conn->error]);
    exit;
  }
  $stmt->bind_param("i", $id);
  if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Delete fallito: " . $stmt->error]);
    exit;
  }
  $stmt->close();

  echo json_encode(["message" => "Task eliminata con successo"]);
  exit;
}

http_response_code(405);
echo json_encode(["error" => "Metodo non supportato"]);
exit;
?>
