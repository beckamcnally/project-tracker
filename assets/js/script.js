let date = $('#date')
let myModal = $('#myModal')
let projectNameInput = $('#projectNameInput')
let projectTypeInput = $('#projectTypeInput')
let projectDateInput = $('#projectDateInput')
let projectForm = $('#projectForm')
let displayProjects = $('#displayProjects')
console.log(projectForm)

function displayDate() {
  let currentDate = dayjs().format('MMM DD, YYYY hh:mm:ss a')
  date.text(currentDate)
}
displayDate()
setInterval(displayDate, 1000)



function getFromStorage() {
  let projects = localStorage.getItem('projects')
  if (projects) {
    projects = JSON.parse(projects)
  } else {
    projects = []
  }
  return projects
}

function projectsDisplay() {
  displayProjects.empty()

  let projects = getFromStorage();
  
  for (let index = 0; index < projects.length; index++) {
    let project = projects[index]
    let projectDate = dayjs(project.date)
    let today = dayjs().startOf('day')

    let row = $('<tr>');
    let individualProjectName = $('<td>').text(project.name)
    let individualProjectType = $('<td>').text(project.type)
    let individualProjectDate = $('<td>').text(projectDate.format('MM/DD/YYYY'))
    let individualProjectDeleteBtn = $('<td><button class="btn btn-sm btn-delete-project" data-index="' + index +'">X</button></td>')
 

  if (projectDate.isBefore(today)) {
    row.addClass('project-late');
  } else if (projectDate.isSame(today)) {
    row.addClass('project-today');
  }

  row.append(individualProjectName, individualProjectType, individualProjectDate, individualProjectDeleteBtn);
  displayProjects.append(row); 
}
}

function saveProjectsToStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function handleFormSubmit(event) {
  event.preventDefault();
console.log('made it to handle form submit')

  let newProject = {
    name: projectNameInput.val().trim(),
    type: projectTypeInput.val(),
    date: projectDateInput.val(),
  };

  let projects = getFromStorage()
  projects.push(newProject)
  saveProjectsToStorage(projects)

  projectsDisplay()


  projectNameInput.val('')
  projectTypeInput.val('')
  projectDateInput.val('')
}

function deleteProject(){
  console.log('todelete')
}
projectsDisplay()
projectForm.on('submit', handleFormSubmit)