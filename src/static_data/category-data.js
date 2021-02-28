export const categories = [ 'Assessment of Student Learning', 'Student Work Time', 'Teacher-Led Time', 'Transitions'];

export const categoryMap = { 
    'Assessment of Student Learning' : ['Oral Assessment of Student Learning', 'Written Assessment of Student Learning'],
    'Student Work Time' : ['Small Group Discussion/Activity', 'Independent Practice/Activity', 'Combined Practices'],
    'Teacher-Led Time' : ['Welcome / Lesson Launch', 'Teacher-Directed Instruction', 'Whole-Class Discussion / activity'],
    'Transitions' : ['Arrival Routine', 'Transition to Next Component', 'Dismissal Routine', 'Unplanned Interruption']
}

const categoryColorMap = {
    'Category' : '#e8e8e8',
    'Assessment of Student Learning' : "#d1c3d6",
    'Student Work Time' : "#cf9a83",
    'Teacher-Led Time' : "#d5edb7",
    'Transitions' : "#9fc3d1",
}

export const getCategoryColor = (category) => {
    return categoryColorMap[category];
}
// export default { categories, categoryMap, categoryColorMap, getCategoryColor} ;

