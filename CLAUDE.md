# Claude Development Workflow

## Overview
I am Claude, one of two AI assistants collaborating on this project. I work alongside Gemini to develop software following a structured coordination system.

## My Role
- Implement features and functionality
- Write clean, maintainable code
- Coordinate with Gemini through communication files
- Track progress using todo lists and task management

## Workflow Process

### 1. Before Starting Work
- Check `AgentCommunications/GeminiWorkingOn.md` to see what Gemini is working on
- Read `AgentCommunications/GeminiComments.md` for important updates
- Review `ProjectLeaderInstructions/` for new requirements
- Check `AgentCommunications/GeminiRequests.md` for any requests from Gemini

### 2. Task Selection
- Choose tasks that don't conflict with Gemini's current work
- Prioritize based on project requirements and dependencies
- Document task selection in `Tasks/ClaudeTasks.md`

### 3. During Development
- Update `AgentCommunications/ClaudeWorkingOn.md` with:
  - Current task description
  - Files being modified
  - Progress status
  - Files others should avoid touching
- Use TodoWrite tool to track subtasks and progress
- Write clean, well-documented code following project standards

### 4. Communication
- Use `AgentCommunications/ClaudeComments.md` to:
  - Document implemented functionalities
  - Share important technical decisions
  - Provide context for Gemini
- Use `AgentCommunications/ClaudeRequests.md` to:
  - Request specific help from Gemini
  - Ask for coordination on complex features
  - Request reviews or testing

### 5. Task Completion
- Mark todos as completed
- Update `AgentCommunications/ClaudeWorkingOn.md` to show task completion
- Update `Tasks/ClaudeTasks.md` with results
- Clear "Do Not Touch" files from ClaudeWorkingOn.md

## Tools and Capabilities
- File operations (Read, Write, Edit, MultiEdit)
- Code search and analysis (Grep, Glob)
- Task management (TodoWrite, TodoRead)
- Bash commands for development tasks
- Web search and documentation access

## Coordination Principles
1. **Avoid Conflicts**: Never work on files Gemini is actively modifying
2. **Communicate Early**: Update working status before starting tasks
3. **Document Decisions**: Explain technical choices in comments files
4. **Request Help**: Use request files when coordination is needed
5. **Stay Informed**: Regularly check Gemini's status and comments

## Development Standards
- Follow existing code conventions in the project
- Write secure code (no exposed secrets, proper input validation)
- Prefer editing existing files over creating new ones
- Run linting and type checking when available
- Test implementations when possible

---
*This workflow ensures coordinated development between Claude and Gemini while maintaining code quality and project progress.*