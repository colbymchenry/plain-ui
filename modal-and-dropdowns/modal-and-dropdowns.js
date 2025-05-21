class Dialog {
    constructor(querySelector, triggerQuerySelector) {
        const elem = () => document.querySelector(querySelector)
        const trigger = () => document.querySelector(triggerQuerySelector)

        const closeDialog = () => {
            // Re-enable scrolling
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            const mainElement = document.querySelector('main');
            if (mainElement) mainElement.style.overflow = '';

            elem().close()
        }

        document.addEventListener('DOMContentLoaded', function () {
            if (!elem()) return;

            if (elem().tagName.toLowerCase() !== 'dialog') return;

            if (trigger()) {
                trigger().addEventListener('click', function () {
                    // Get trigger element position
                    const rect = trigger().getBoundingClientRect();
                    // Set position as CSS variables on dialog element
                    elem().style.setProperty('--trigger-x', `${rect.left}px`);
                    elem().style.setProperty('--trigger-y', `${rect.top}px`);
                    elem().style.setProperty('--trigger-width', `${rect.width}px`);
                    elem().style.setProperty('--trigger-height', `${rect.height}px`);

                    // Disable scrolling
                    document.body.style.overflow = 'hidden';
                    document.documentElement.style.overflow = 'hidden';
                    const mainElement = document.querySelector('main');
                    if (mainElement) mainElement.style.overflow = 'hidden';

                    elem().showModal();

                    const elemRect = elem().getBoundingClientRect();
                    const bottomSpace = Math.min(window.innerHeight - elemRect.bottom, 0);
                    elem().style.setProperty('--trigger-margin-top', `${bottomSpace < 0 ? bottomSpace - 2 : 0}px`);
                    const rightSpace = Math.min(window.innerWidth - elemRect.right, 0);
                    elem().style.setProperty('--trigger-margin-left', `${rightSpace < 0 ? rightSpace - 2 : 0}px`);
                });
            }

            // Close dialog when clicking outside
            elem().addEventListener('click', (e) => {
                if (e.target === elem()) {
                    closeDialog();
                }
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && elem().open) {
                    closeDialog();
                }
            });

            const closeButtons = Array.from(elem().querySelectorAll('[data-close-dialog]'));

            if (!closeButtons.length) return;

            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    closeDialog();
                });
            });
        });
    }
}