import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delay = form.elements.delay.value;
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay =>
      iziToast.success({
        title: 'Ok',
        titleColor: '#fff',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        theme: 'dark',
      })
    )
    .catch(delay =>
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        theme: 'dark',
      })
    );

  form.reset();
}
