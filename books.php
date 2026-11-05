
<?php

header('Content-Type: application/json; charset=UTF-8');

require __DIR__ . '/db.php';

$search = $_GET['q'] ?? '';

if (!is_string($search)) {
    $search = '';
}

$search = trim($search);

$sql = "
    SELECT
        books.title,
        books.author,
        books.year,
        subjects.name AS subject,
        books.copies,
        (books.copies - books.on_loan) AS available
    FROM books
    JOIN subjects ON books.subject_id = subjects.id
    WHERE books.title LIKE :search
       OR books.author LIKE :search
    ORDER BY books.title
";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    'search' => '%' . $search . '%'
]);

$books = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($books);
