export const DRAFT_PREFIX = "draft_organ_";

export function getDraftKey(organId) {
  if (!organId) return null;
  return `${DRAFT_PREFIX}${organId}`;
}

export function getAllDrafts() {
  const drafts = [];

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(DRAFT_PREFIX)) {
      try {
        const parsed = JSON.parse(localStorage.getItem(key));
        drafts.push(parsed);
      } catch {}
    }
  });

  return drafts;
}

export function deleteDraft(organId) {
  const key = getDraftKey(organId);
  localStorage.removeItem(key);
}
