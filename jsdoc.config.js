module.exports = {
  source: {
    include: [
      "../Blackboard/BlackBoard_Back/BlackBoard",
      "../Blackboard/Gerenciador",
      "../Blackboard/Loja_Varejo_1",
      "../Blackboard/Loja_Varejo_2",
    ],
    includePattern: ".+\\.(js|jsx)$",
    excludePattern: "(node_modules|build|.*\\.env|.*\\.json)",
  },
  plugins: ["plugins/markdown", "node_modules/jsdoc-tsimport-plugin/index.js"],
  opts: {
    destination: "./docs/",
    recurse: true,
    template: "node_modules/better-docs",
  },
  tags: {
    allowUnknownTags: true,
  },
};
