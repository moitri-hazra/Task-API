# Task Management System Documentation

## Introduction
This documentation provides an overview of the Task Management System, outlining its functionalities, APIs, and implementation details.

### Project Overview
The Task Management System is designed to facilitate task and subtask management for users. It allows users to create, update, and delete tasks and subtasks, as well as prioritize tasks based on their due dates. Additionally, the system includes cron jobs for automatically updating task priorities and initiating voice calls using Twilio for tasks that pass their due dates.

## APIs
The following APIs are available in the Task Management System:

1. **Create Task**
   - Input: Title, description, due date
   - Authentication: JWT auth token
   - Endpoint: `/api/tasks`
   - Method: POST

2. **Create Subtask**
   - Input: Task ID
   - Endpoint: `/api/subtasks`
   - Method: POST

3. **Get All User Tasks**
   - Filters: Priority, due date, pagination
   - Endpoint: `/api/tasks`
   - Method: GET

4. **Get All User Subtasks**
   - Filters: Task ID (optional)
   - Endpoint: `/api/subtasks`
   - Method: GET

5. **Update Task**
   - Input: Due date, status ("TODO" or "DONE")
   - Endpoint: `/api/tasks/:id`
   - Method: PUT

6. **Update Subtask**
   - Input: Status (0 or 1)
   - Endpoint: `/api/subtasks/:id`
   - Method: PUT

7. **Delete Task (Soft Deletion)**
   - Endpoint: `/api/tasks/:id`
   - Method: DELETE

8. **Delete Subtask (Soft Deletion)**
   - Endpoint: `/api/subtasks/:id`
   - Method: DELETE

## Cron Jobs
The Task Management System includes two cron jobs for automated tasks:

1. **Task Priority Update**
   - Description: Updates task priorities based on due dates.
   - Logic: 
     - Priority 0: Due date is today.
     - Priority 1: Due date is between tomorrow and day after tomorrow.
     - Priority 2: Due date is 3-4 days from today.
     - Priority 3: Due date is 5+ days from today.

2. **Voice Calling using Twilio**
   - Description: Initiates voice calls using Twilio for tasks that pass their due dates.
   - Logic:
     - Calls users based on priority: 0 -> 1 -> 2.
     - Calls the next user if the previous user does not attend the call.

## Implementation Details
- Proper input validation is implemented for API calls.
- User-friendly error messages are provided for better user experience.
- JWT token authentication is used to authenticate users for API calls.
- Subtasks are updated accordingly when tasks are updated or deleted.
- Task model includes fields for priority and status as per the provided specifications.

## Conclusion
The Task Management System provides a comprehensive solution for managing tasks and subtasks, ensuring efficient task organization and user-friendly interaction. With automated cron jobs, the system enhances productivity by automating task prioritization and reminder calls for overdue tasks.