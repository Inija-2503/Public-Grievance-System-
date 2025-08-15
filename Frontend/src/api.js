export const API = "http://localhost:8080/api";

export const signIn = async (credentials) => {
    try {
        const res = await fetch(`${API}/users/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        // Always try to parse the response as JSON, even if it's an error.
        // This is crucial because your backend might send an error message in JSON.
        const data = await res.json();

        if (!res.ok) {
            // If response is not OK (e.g., 400, 401, 500), throw an error with backend's message
            // Log the full data for debugging purposes
            console.error("Sign-in failed (backend error):", data);
            throw new Error(data.message || "Invalid login credentials. Please try again.");
        }

        // Log the successful data received from the backend
        console.log("Sign-in successful (backend response):", data);

        // Return the parsed data for the frontend to use
        return data;

    } catch (error) {
        // This catches network errors or errors thrown from res.json() if response is not JSON
        console.error("Network or parsing error during sign-in:", error);
        if (error.name === 'AbortError') { // Handle request cancellation
            throw new Error("Request timed out or was aborted.");
        } else if (error.message.includes("Unexpected token") || error.message.includes("JSON")) {
            // This suggests the server sent non-JSON (like HTML for an error page)
            throw new Error("Server returned an unexpected response format. Please try again later.");
        } else {
            throw new Error(error.message || "An unexpected error occurred during sign-in.");
        }
    }
};

export const fetchUserById = async () => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token"); // assuming you store JWT as "token"

    try {
        const res = await fetch(`${API}/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` //  pass token
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error(`Error fetching user ${id}:`, errorData);
            throw new Error(errorData.message || `Failed to fetch user data for ID: ${id}`);
        }

        const data = await res.json();
        console.log(`Fetched user ${id} data:`, data);
        return data;
    } catch (error) {
        console.error("Network or parsing error during fetchUserById:", error);
        throw new Error(error.message || "An unexpected error occurred while fetching user data.");
    }
};


export const updateUser = async (id, data) => {
    try {
        const res = await fetch(`${API}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        // Check for non-OK responses
        if (!res.ok) {
            const errorData = await res.json(); // Trys to parse error message
            console.error(`Error updating user ${id}:`, errorData);
            throw new Error(errorData.message || `Failed to update user data for ID: ${id}`);
        }

        const updatedData = await res.json();
        console.log(`User ${id} updated successfully:`, updatedData);
        return updatedData;
    } catch (error) {
        console.error("Network or parsing error during updateUser:", error);
        throw new Error(error.message || "An unexpected error occurred while updating user data.");
    }
};