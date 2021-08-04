const addbutton = document.querySelector("#add")

const updatedata = () =>{
  const textAreaData = document.querySelectorAll('textarea');
  const notes = [];

  textAreaData.forEach((note) => {
    return notes.push(note.value)
  });

  localStorage.setItem('notes', JSON.stringify(notes));

}

const addNewNote = (text = '') => {

  const note = document.createElement('div');
  note.classList.add('note');

  const htmlData = `
  <div class="operation">
    <button  class="edit"> <i class="fas fa-edit"></i></button>
    <button class="delete"> <i class="fas fa-trash-alt"></i></button>
  </div>

  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : ""}"> </textarea> `;

  note.insertAdjacentHTML('afterBegin', htmlData)
  document.body.appendChild(note);

  const editbtn = note.querySelector('.edit');
  const delbtn = note.querySelector('.delete');
  const maindiv = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  delbtn.addEventListener('click', () =>{
    note.remove();
    updatedata();
  })

  textArea.value = text;
  maindiv.innerHTML = text;

  editbtn.addEventListener("click", () => {
    maindiv.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  })

  textArea.addEventListener('change', (event) => {
    const value = event.target.value;
    maindiv.innerHTML = value;

    updatedata();
  })
}

const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){notes.forEach((note) => {
  addNewNote(note);
});
}

addbutton.addEventListener("click", () => {
  addNewNote();
})
