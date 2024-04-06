local parsers = require("nvim-treesitter.parsers").get_parser_configs()

local M = {}

function M.init()
    parsers.rust_with_rstml = {
        install_info = {
            url = "https://github.com/rayliwell/tree-sitter-rstml",
            branch = "main",
            files = { "src/parser.c", "src/scanner.c" },
            location = "rust_with_rstml",
        },
        filetype = "rust"
    }
end

function M.setup()
    vim.treesitter.language.register("rust", { "rust_with_rstml" })
end

return M
