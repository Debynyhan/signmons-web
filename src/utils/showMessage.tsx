export const showMessage = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
  const messageBox = document.getElementById('messageBox');
  if (messageBox) {
    messageBox.textContent = message;
    messageBox.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 transition-opacity duration-300 opacity-100 ${
      type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-blue-600'
    }`;

    setTimeout(() => {
      messageBox.className = messageBox.className.replace('opacity-100', 'opacity-0');
    }, 3000);
  }
};

export default showMessage;