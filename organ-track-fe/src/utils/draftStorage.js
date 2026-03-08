export const DRAFT_PREFIX = "draft_organ_";

export function getUserDrafts(userId) {
  const drafts = [];

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("draft_organ_") && key.endsWith(`_user_${userId}`)) {
      try {
        const parsed = JSON.parse(localStorage.getItem(key));
        drafts.push(parsed);
      } catch {}
    }
  });

  return drafts;
}

export function deleteDraft(organId, userId) {
  const key = getDraftKey(organId, userId);
  if (key) localStorage.removeItem(key);
}

export const getDraftKey = (organId, userId) => {
  if (!userId) return null;
  return `draft_organ_${organId}_user_${userId}`;
};
