const createdTournament = jest.fn().mockReturnValue({
  id: "ed6c6712-f272-4ff5-b894-5009821093b8",
  name: "Taça Libertadores da América",
  created_at: new Date(),
});

const tournamentsList = jest.fn().mockReturnValue([
  {
    id: "afdc6e26-ecce-4866-976e-892dbab448c8",
    name: "Campeonato Brasileiro",
    created_at: new Date(),
  },
  {
    id: "b5e61f13-c420-44b2-92d5-38c9ae17e8a0",
    name: "Mundial de Clubes",
    created_at: new Date(),
  },
  {
    id: "ed6c6712-f272-4ff5-b894-5009821093b8",
    name: "Taça Libertadores da América",
    created_at: new Date(),
  },
]);

const tournamentDoesNotExists = jest.fn().mockReturnValue(null);

export { createdTournament, tournamentDoesNotExists, tournamentsList };
