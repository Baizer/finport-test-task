import { onMounted, onUnmounted } from 'vue';

export function useClickOutside(
  callback: (event: Event) => void,
  selectors: string[]
) {
  function handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    
    const isOutside = selectors.every(selector => 
      !target.closest(selector)
    );
    
    if (isOutside) {
      callback(event);
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
}
