<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "tasksks_uid_db", "3uuhN12~", "tasksks_db");
if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["error" => "Connessione al DB fallita: " . $conn->connect_error]);
  exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $result = $conn->query("SELECT * FROM `Categoria`");
  if ($result === false) {
    http_response_code(500);
    echo json_encode(["error" => "Errore query: " . $conn->error]);
    exit;
  }
  $categorie = [];
  while ($row = $result->fetch_assoc()) {
    $categorie[] = $row;
  }
  echo json_encode($categorie);
  exit;
}

if ($method === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);
  $nome = trim($data['nome'] ?? '');
  if ($nome === '') {
    http_response_code(400);
    echo json_encode(["error" => "Nome categoria obbligatorio"]);
    exit;
  }
  $stmt = $conn->prepare("SELECT COUNT(*) FROM `Categoria` WHERE nome = ?");
  $stmt->bind_param("s", $nome);
  $stmt->execute();
  $stmt->bind_result($count);
  $stmt->fetch();
  $stmt->close();
  if ($count > 0) {
    http_response_code(409);
    echo json_encode(["error" => "Categoria già esistente"]);
    exit;
  }
  $stmt = $conn->prepare("INSERT INTO `Categoria` (nome) VALUES (?)");
  $stmt->bind_param("s", $nome);
  if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Errore inserimento: " . $stmt->error]);
    exit;
  }
  echo json_encode(["id" => $stmt->insert_id, "nome" => $nome]);
  $stmt->close();
  exit;
}

if ($method === 'DELETE') {
  parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $q);
  $id = intval($q['id'] ?? 0);
  if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Id mancante o non valido"]);
    exit;
  }
  $stmt = $conn->prepare("DELETE FROM `Categoria` WHERE id = ?");
  $stmt->bind_param("i", $id);
  if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Errore eliminazione: " . $stmt->error]);
    exit;
  }
  echo json_encode(["success" => true]);
  $stmt->close();
  exit;
}

http_response_code(405);
echo json_encode(["error" => "Metodo non supportato"]);
exit;
?>
