
export default {
    getTasksURL: 'https://services.aramtech.ly/interview/api/tasks',
    addTaskURL: 'https://services.aramtech.ly/interview/api/tasks/add_task',
    changeTaskURL: 'https://services.aramtech.ly/interview/api/tasks/change_status',
    deleteTaskURL: 'https://services.aramtech.ly/interview/api/tasks/delete_task',

    headers: {
        'tasks-token': 'gimmetasks@interview123',    // Custom headers should be prefixed with x- ???
        'task-token': 'gimmetasks@interview123',    // Custom headers should be prefixed with x- ???
        'Content-Type': 'application/json'
    }
}
