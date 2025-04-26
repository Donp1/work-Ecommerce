export const getUser = async (userId: number) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/users/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch user");

    const user = await res.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
