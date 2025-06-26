<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "tasksks_uid_db", "3uuhN12~", "tasksks_db");
if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["error"=>"DB failed: ".$conn->connect_error]);
  exit;
}

$method = $_SERVER['REQUEST_METHOD'];
function parseId($v){ return is_numeric($v)?(int)$v:null; }

if($method==='GET'){
  $sql = "
    SELECT 
      p.id,
      p.nome,
      GROUP_CONCAT(DISTINCT c.id) AS categoriaIds,
      GROUP_CONCAT(DISTINCT c.nome) AS categorie,
      GROUP_CONCAT(DISTINCT t.id) AS taskIds,
      GROUP_CONCAT(DISTINCT t.nome) AS tasks
    FROM `Progetto` p
    LEFT JOIN `_CategoriaToProgetto` cp ON p.id = cp.B
    LEFT JOIN `Categoria` c ON c.id = cp.A
    LEFT JOIN `Task` t ON t.progettoId = p.id
    GROUP BY p.id
  ";
  $res = $conn->query($sql);
  if($res===false){
    http_response_code(500);
    echo json_encode(["error"=>"Query failed: ".$conn->error]);
    exit;
  }
  $out=[];
  while($r=$res->fetch_assoc()){
    
    $ids = $r['categoriaIds'] ? explode(',', $r['categoriaIds']) : [];
    $names = $r['categorie'] ? explode(',', $r['categorie']) : [];
    $categorie = [];
    foreach ($ids as $index => $id) {
      $nome = $names[$index] ?? '';
      $categorie[] = ['id' => (int)$id, 'nome' => $nome];
    }
    $r['categorie'] = $categorie;
    unset($r['categoriaIds']);

    $taskIds = $r['taskIds'] ? explode(',', $r['taskIds']) : [];
    $taskNames = $r['tasks'] ? explode(',', $r['tasks']) : [];
    $tasks = [];
    foreach ($taskIds as $index => $id) {
      $nome = $taskNames[$index] ?? '';
      $tasks[] = ['id' => (int)$id, 'nome' => $nome];
    }
    $r['tasks'] = $tasks;
    unset($r['taskIds']);
    unset($r['tasks']);

    $out[] = $r;
  }
  echo json_encode($out);
  exit;
}


if($method==='POST'){
  $d=json_decode(file_get_contents("php://input"),true);
  $nome=trim($d['nome']??'');
  $catIds=$d['categoriaIds']??[];
  if(!$nome){
    http_response_code(400);
    echo json_encode(["error"=>"Nome obbligatorio"]);exit;
  }
  if(!is_array($catIds)||array_filter($catIds,fn($i)=>!is_numeric($i))){
    http_response_code(400);
    echo json_encode(["error"=>"categoriaIds array di numeri"]);exit;
  }
  $stmt=$conn->prepare("INSERT INTO `Progetto` (nome) VALUES(?)");
  $stmt->bind_param("s",$nome);
  if(!$stmt->execute()){
    http_response_code(500);
    echo json_encode(["error"=>"Insert failed: ".$stmt->error]);exit;
  }
  $pid=$stmt->insert_id; $stmt->close();
  $stmt=$conn->prepare("INSERT INTO `_CategoriaToProgetto` (A,B) VALUES(?,?)");
  foreach($catIds as $cid){
    $iCid=(int)$cid;
    $stmt->bind_param("ii",$iCid,$pid);
    $stmt->execute();
  }
  $stmt->close();
  echo json_encode(["id"=>$pid,"nome"=>$nome,"categoriaIds"=>$catIds]);
  exit;
}

if($method==='PUT'){
  $d=json_decode(file_get_contents("php://input"),true);
  $id=parseId($d['id']??null);
  $nome=trim($d['nome']??'');
  $catIds=$d['categoriaIds']??[];
  if(!$id||!$nome||!is_array($catIds)){
    http_response_code(400);
    echo json_encode(["error"=>"Dati non validi"]);exit;
  }
  $check=$conn->prepare("SELECT id FROM `Progetto` WHERE id=?");
  $check->bind_param("i",$id);
  $check->execute();
  if($check->get_result()->num_rows===0){
    http_response_code(404);
    echo json_encode(["error"=>"Progetto non trovato"]);exit;
  }
  $check->close();
  $stmt=$conn->prepare("UPDATE `Progetto` SET nome=? WHERE id=?");
  $stmt->bind_param("si",$nome,$id);
  $stmt->execute();
  $stmt->close();
  $conn->query("DELETE FROM `_CategoriaToProgetto` WHERE B=$id");
  $stmt=$conn->prepare("INSERT INTO `_CategoriaToProgetto` (A,B) VALUES(?,?)");
  foreach($catIds as $cid){
    $iCid=(int)$cid;
    $stmt->bind_param("ii",$iCid,$id);
    $stmt->execute();
  }
  $stmt->close();
  echo json_encode(["id"=>$id,"nome"=>$nome,"categoriaIds"=>$catIds]);
  exit;
}

if($method==='DELETE'){
  parse_str(parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY),$q);
  $id=parseId($q['id']??null);
  if(!$id){
    http_response_code(400);
    echo json_encode(["error"=>"ID mancante"]);exit;
  }
  $check=$conn->prepare("SELECT id FROM `Progetto` WHERE id=?");
  $check->bind_param("i",$id);
  $check->execute();
  if($check->get_result()->num_rows===0){
    http_response_code(404);
    echo json_encode(["error"=>"Progetto non trovato"]);exit;
  }
  $check->close();
  $conn->query("DELETE FROM `_CategoriaToProgetto` WHERE B=$id");
  $stmt=$conn->prepare("DELETE FROM `Progetto` WHERE id=?");
  $stmt->bind_param("i",$id);
  if(!$stmt->execute()){
    http_response_code(500);
    echo json_encode(["error"=>"Delete failed: ".$stmt->error]);exit;
  }
  echo json_encode(["message"=>"Progetto eliminato"]);
  exit;
}

http_response_code(405);
echo json_encode(["error"=>"Metodo non supportato"]);
exit;
?>
