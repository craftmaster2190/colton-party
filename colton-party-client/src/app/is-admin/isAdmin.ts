export function isAdmin() {
  return localStorage.getItem("isAdmin") === 'true';
}

export function canBecomeAdmin() {
  return localStorage.getItem("isAdmin") === 'false';
}

export function becomeAdmin() {
  localStorage.setItem("isAdmin", 'true');
  location.href = location.href.split('?')[0];
}

export function removeAdminFlag() {
  localStorage.setItem("isAdmin", 'false');
  location.href = location.href.split('?')[0];
}
