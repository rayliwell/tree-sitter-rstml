local M = {}

function M.init()
	local install_info = {
		url = "https://github.com/rayliwell/tree-sitter-rstml",
		branch = "main",
		files = { "src/parser.c", "src/scanner.c" },
		location = "rust_with_rstml",
	}

	local ok, parsers = pcall(require("nvim-treesitter.parsers").get_parser_configs)
	if ok then
		parsers.rust_with_rstml = {
			install_info = install_info,
			filetype = "rust",
		}
	else
		-- Support nvim-treesitter versions before and after 1.10.
		vim.api.nvim_create_autocmd("User", {
			pattern = "TSUpdate",
			callback = function()
				require("nvim-treesitter.parsers").rust_with_rstml = {
					install_info = install_info,
				}
			end,
		})
	end
end

function M.setup()
	vim.treesitter.language.register("rust_with_rstml", { "rust" })
end

return M
