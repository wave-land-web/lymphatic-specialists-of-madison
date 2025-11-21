# Lymphatic Specialists of Madison

## Contributing

### Workflow

1. **Create a branch off `staging`**

   ```bash
   git checkout staging
   git pull origin staging
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Commit frequently with clear messages
   - Test locally before pushing

3. **Open a PR to merge into `staging`**
   - Push your branch: `git push origin feature/your-feature-name`
   - Open a pull request on GitHub targeting `staging`

### Pull Request Template

```markdown
## Description

Brief description of what this PR does

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Content update
- [ ] Styling/UI change
- [ ] Performance improvement

## Testing

- [ ] Tested locally
- [ ] Forms work as expected
- [ ] No console errors

## Screenshots (if applicable)

Add screenshots here
```
