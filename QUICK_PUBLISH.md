# Quick Publish Guide

## Quick Steps to Publish

### 1. Update package.json

```bash
# Edit package.json and add:
# - Your author name/email
# - Repository URL (if using GitHub)
# - Verify version is 1.0.0
```

### 2. Check package name availability

```bash
npm view io-password-strength
# If 404, name is available. If you see package info, name is taken.
```

### 3. Login to npm

```bash
npm login
# Enter username, password, email
```

### 4. Verify you're logged in

```bash
npm whoami
```

### 5. Test before publishing

```bash
# Run type check
npm run typecheck

# Dry run (see what will be published)
npm publish --dry-run
```

### 6. Publish!

```bash
npm publish
```

### 7. Verify

```bash
# Check your package on npm
npm view io-password-strength

# Visit: https://www.npmjs.com/package/io-password-strength
```

## Updating the Package

### Bump version and publish

```bash
# Patch (1.0.0 -> 1.0.1)
npm version patch && npm publish

# Minor (1.0.0 -> 1.1.0)
npm version minor && npm publish

# Major (1.0.0 -> 2.0.0)
npm version major && npm publish
```

## Important Files

- `package.json` - Package configuration
- `.npmignore` - Files to exclude from npm package
- `README.md` - Package documentation
- `LICENSE` - MIT License
- `src/` - Source code (will be published)

## Before Publishing Checklist

- [ ] Update author in `package.json`
- [ ] Update repository URL in `package.json`
- [ ] Verify package name is available
- [ ] Run `npm run typecheck` (should pass)
- [ ] Run `npm publish --dry-run` (review output)
- [ ] Login to npm (`npm login`)
- [ ] Ready to publish!

---

For detailed instructions, see [PUBLISH.md](./PUBLISH.md)
