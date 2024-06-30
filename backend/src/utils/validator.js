function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidGitHubId(githubId) {
    const githubIdRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
    return githubIdRegex.test(githubId);
}

export {isValidEmail, isValidGitHubId}