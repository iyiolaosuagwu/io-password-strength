# Publishing to npm - Step by Step Guide

This guide will walk you through the process of publishing `io-password-strength` to npm.

## Prerequisites

1. **Node.js and npm installed** - Make sure you have Node.js and npm installed on your system
2. **npm account** - Create an account at [npmjs.com](https://www.npmjs.com/) if you don't have one
3. **Package name availability** - Check if `io-password-strength` is available on npm

## Step 1: Check Package Name Availability

Before publishing, verify the package name is available:

```bash
npm view io-password-strength
```

If you get a 404 error, the name is available. If you get package information, the name is taken and you'll need to choose a different name.

## Step 2: Update package.json

### 2.1 Add Author Information

Edit `package.json` and add your information:

```json
{
  "author": "Iyiola Osuagwu <iyiolaosuagwu1.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/iyiolaosuagwu/io-password-strength.git"
  },
  "homepage": "https://github.com/iyiolaosuagwu/io-password-strength#readme",
  "bugs": {
    "url": "https://github.com/iyiolaosuagwu/io-password-strength/issues"
  }
}
```

### 2.2 Verify Package Configuration

Make sure your `package.json` has:

- ✅ Unique package name
- ✅ Version number (start with 1.0.0)
- ✅ Description
- ✅ License (MIT recommended)
- ✅ Author information
- ✅ Repository URL (if using GitHub)
- ✅ Correct entry points (`main` and `types`)

## Step 3: Login to npm

Login to your npm account:

```bash
npm login
```

You'll be prompted for:

- Username
- Password
- Email address
- One-time password (if you have 2FA enabled)

Verify you're logged in:

```bash
npm whoami
```

## Step 4: Test Your Package Locally

### 4.1 Run Type Check

```bash
npm run typecheck
```

### 4.2 Run Linter

```bash
npm run lint
```

### 4.3 Test Package Installation (Optional)

You can test the package locally before publishing:

```bash
# Create a test package
npm pack

# This creates a .tgz file that you can install in another project
# npm install ./io-password-strength-1.0.0.tgz
```

## Step 5: Dry Run (Test Publish)

Do a dry run to see what will be published without actually publishing:

```bash
npm publish --dry-run
```

This will show you:

- What files will be included
- Package size
- Any warnings

## Step 6: Publish to npm

### 6.1 First Time Publishing

```bash
npm publish
```

### 6.2 Publishing Updates

For subsequent versions, update the version number first:

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

Then publish:

```bash
npm publish
```

### 6.3 Publishing Beta/Alpha Versions

For pre-release versions:

```bash
# Beta version
npm version 1.0.1-beta.0
npm publish --tag beta

# Alpha version
npm version 1.0.1-alpha.0
npm publish --tag alpha
```

Users can install with:

```bash
npm install io-password-strength@beta
```

## Step 7: Verify Publication

After publishing, verify your package is live:

1. **Check npm registry:**

   ```bash
   npm view io-password-strength
   ```

2. **Visit npm page:**

   ```
   https://www.npmjs.com/package/io-password-strength
   ```

3. **Test installation:**
   ```bash
   npm install io-password-strength
   ```

## Step 8: Post-Publishing

### 8.1 Create Git Tag

Tag your release in git:

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 8.2 Create GitHub Release (if using GitHub)

1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Select the tag you just created
4. Add release notes
5. Publish the release

## Troubleshooting

### Error: Package name already exists

If the package name is taken:

1. Choose a different name
2. Update `package.json` with the new name
3. Update README.md if it references the old name

### Error: You must verify your email

Verify your email address:

1. Check your email for verification link from npm
2. Click the verification link
3. Try publishing again

### Error: Package version already exists

If the version already exists:

1. Update the version in `package.json`
2. Use `npm version patch/minor/major` to bump version
3. Try publishing again

### Error: Invalid package.json

Common issues:

- Missing required fields (name, version, description)
- Invalid JSON syntax
- Missing license field

Fix by checking `package.json` syntax and required fields.

## Best Practices

1. **Semantic Versioning**: Follow [semver](https://semver.org/)

   - MAJOR: Breaking changes
   - MINOR: New features (backwards compatible)
   - PATCH: Bug fixes

2. **Changelog**: Maintain a CHANGELOG.md file

3. **README**: Keep README.md updated with:

   - Installation instructions
   - Usage examples
   - API documentation
   - Contributing guidelines

4. **Testing**: Add tests before publishing

5. **CI/CD**: Set up automated testing and publishing

## Version Management Commands

```bash
# View current version
npm version

# Bump patch version (1.0.0 -> 1.0.1)
npm version patch

# Bump minor version (1.0.0 -> 1.1.0)
npm version minor

# Bump major version (1.0.0 -> 2.0.0)
npm version major

# View published versions
npm view io-password-strength versions
```

## Unpublishing (Use with Caution)

⚠️ **Warning**: Unpublishing packages should be done carefully and only in specific circumstances.

```bash
# Unpublish a specific version (within 72 hours)
npm unpublish io-password-strength@1.0.0

# Unpublish entire package (within 72 hours, and no other packages depend on it)
npm unpublish io-password-strength --force
```

**Note**: After 72 hours, you cannot unpublish. You can only deprecate:

```bash
npm deprecate io-password-strength@1.0.0 "This version has security issues"
```

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm CLI Commands](https://docs.npmjs.com/cli/v8/commands)

## Quick Reference Checklist

Before publishing, make sure:

- [ ] Package name is available
- [ ] `package.json` has all required fields
- [ ] Author information is added
- [ ] Repository URL is correct (if applicable)
- [ ] README.md is complete and accurate
- [ ] Code is tested and linted
- [ ] `.npmignore` is configured correctly
- [ ] Version number is set correctly
- [ ] You're logged into npm (`npm whoami`)
- [ ] Dry run passes (`npm publish --dry-run`)

Happy publishing! 🚀
