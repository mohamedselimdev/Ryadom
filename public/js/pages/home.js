import '../layout.js';
import { api } from '../api.js';
import { t } from '../i18n.js';
import { doctorCard, emptyState } from '../components.js';

function initLibrary() {
  const search = document.getElementById('library-search');
  const chips = document.querySelectorAll('[data-category]');
  const items = document.querySelectorAll('.library-item');
  const empty = document.getElementById('library-empty');
  let category = 'all';

  const apply = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    items.forEach((item) => {
      const show =
        (category === 'all' || item.dataset.type === category) && item.textContent.toLowerCase().includes(query);
      item.hidden = !show;
      if (show) visible += 1;
    });
    empty.hidden = visible > 0;
  };

  search.addEventListener('input', apply);
  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      category = chip.dataset.category;
      chips.forEach((c) => {
        c.classList.toggle('is-active', c === chip);
        c.setAttribute('aria-pressed', String(c === chip));
      });
      apply();
    })
  );
  document.addEventListener('langchange', apply);
}

function initSpecialists() {
  const track = document.getElementById('specialists-track');
  // In RTL the scroll direction is mirrored, so "next" moves towards negative scrollLeft.
  const step = (dir) => dir * track.clientWidth * 0.8 * (document.dir === 'rtl' ? -1 : 1);
  document.querySelector('.carousel-btn.prev').addEventListener('click', () => track.scrollBy({ left: step(-1) }));
  document.querySelector('.carousel-btn.next').addEventListener('click', () => track.scrollBy({ left: step(1) }));

  let psychologists = null;
  let error = null;

  const render = () => {
    if (error) track.replaceChildren(emptyState(t('specialists.loadError', { error: error.message })));
    else if (!psychologists) track.replaceChildren(emptyState(t('specialists.loading')));
    else if (!psychologists.length) track.replaceChildren(emptyState(t('specialists.empty')));
    else track.replaceChildren(...psychologists.map((p) => doctorCard(p)));
  };

  document.addEventListener('langchange', render);
  render();
  api('/psychologists')
    .then((data) => (psychologists = data.psychologists))
    .catch((err) => (error = err))
    .finally(render);
}

initLibrary();
initSpecialists();
