<?php
header('Content-Type: application/json; charset=UTF-8');

require __DIR__ . '/db.php';

$stmt = $pdo->query("SELECT * FROM subjects");
$subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($subjects);