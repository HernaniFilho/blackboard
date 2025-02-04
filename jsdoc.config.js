module.exports = {
  source: {
    include: [
      "../Blackboard/BlackBoard_Back/BlackBoard",
      "../Blackboard/BlackBoard_Back/KnowledgeSource",
      "../Blackboard/Gerenciador/src",
      "../Blackboard/Loja_Varejo_1/src",
      "../Blackboard/Loja_Varejo_2/src",
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
