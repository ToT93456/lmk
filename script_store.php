<?php

declare(strict_types=1);

return [
    'title' => 'Starter Utility Script',
    'description' => 'Example private Lua script served through PHP instead of exposing a raw file directly.',
    'updatedAt' => '2026-06-27',
    'content' => <<<'LUA'
local Utility = {}

function Utility.greet(name)
    local safeName = name or "Developer"
    return ("Hello, %s!"):format(safeName)
end

print(Utility.greet("World"))

return Utility
LUA,
];
