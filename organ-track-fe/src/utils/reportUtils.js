import api from "../api/axios";

export const validatePendingReport = async (reportId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token || !reportId) return false;

    const res = await axios.get(`/report-status/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    // If we get here, the report exists and belongs to this user
    return res.data.status !== undefined; // true if status returned
  } catch (err) {
    // 404 or 401/403 → report doesn't belong to this user
    return false;
  }
};
