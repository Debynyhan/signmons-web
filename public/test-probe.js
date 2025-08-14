(function () {
    try {
        var el = document.createElement('div');
        el.id = 'js-classic-marker';
        el.style.cssText = 'position:fixed;bottom:8px;right:8px;color:#0ff;background:#111;padding:4px 8px;border-radius:4px;font:12px/1.2 monospace;z-index:99999;';
        el.textContent = 'Classic JS ran';
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                document.body.appendChild(el);
            });
        } else {
            document.body.appendChild(el);
        }
        window.__signmons_classic_boot = Date.now();
        // eslint-disable-next-line no-console
        console.log('[test-probe] classic boot', new Date(window.__signmons_classic_boot).toISOString());
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[test-probe] classic boot failed', e);
    }
})();
