export const checkUserExists = async (
  username: string,
  email: string
): Promise<boolean> => {
  try {
    const res = await fetch("https://fakestoreapi.com/users");
    if (!res.ok) throw new Error("Failed to fetch users");

    const users = (await res.json()) as any[];

    const userExists = users.some(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() ||
        user.email?.toLowerCase() === email.toLowerCase()
    );

    return userExists;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
};
