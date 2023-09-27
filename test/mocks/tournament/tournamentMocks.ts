const createdTournament = jest.fn().mockReturnValue({
  id: "ed6c6712-f272-4ff5-b894-5009821093b8",
  name: "Taça Libertadores da América",
  created_at: new Date(),
});

const tournamentDoesNotExists = jest.fn().mockReturnValue(null);

export { createdTournament, tournamentDoesNotExists };
