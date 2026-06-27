<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

$script = require __DIR__ . '/../includes/script_store.php';

echo json_encode(
    [
        'title' => $script['title'],
        'description' => $script['description'],
        'updatedAt' => $script['updatedAt'],
        'content' => $script['content'],
    ],
    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
);
