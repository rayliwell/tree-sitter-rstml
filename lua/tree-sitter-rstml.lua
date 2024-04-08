local M = {}

function M.init()
	local parsers = require("nvim-treesitter.parsers")
	-- Support nvim-treesitter versions before and after 1.10.
	local configs = parsers.configs and parsers.configs or parsers.get_parser_configs()

	configs.rust_with_rstml = {
		install_info = {
			url = "https://github.com/rayliwell/tree-sitter-rstml",
			branch = "main",
			files = { "src/parser.c", "src/scanner.c" },
			location = "rust_with_rstml",
		},
		filetype = "rust",
	}
end

function M.setup()
	vim.treesitter.language.register("rust_with_rstml", { "rust" })
end

return M
