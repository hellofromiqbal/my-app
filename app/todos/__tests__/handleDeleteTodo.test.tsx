describe("filter todos logic", () => {
  it("should filter out a deleted todo from the list", () => {
    const todos = [
      { id: "1", text: "Test Todo 1", isDone: false, createdAt: "2026-01-22T10:00:00Z" },
      { id: "2", text: "Test Todo 2", isDone: true, createdAt: "2026-01-22T11:00:00Z" },
    ];
    const id = "1";

    const filteredTodos = todos.filter(todo => todo.id !== id);

    expect(filteredTodos).toHaveLength(1);
    expect(filteredTodos[0].id).toBe("2");
    expect(filteredTodos).not.toContainEqual(
      expect.objectContaining({ id: "1" })
    );
  });
});
