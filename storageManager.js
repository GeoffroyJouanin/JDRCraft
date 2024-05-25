export function save(name, object)
{
    localStorage.setItem(name, JSON.stringify(object));
}

export function load(name)
{
    return JSON.parse(localStorage.getItem(name));
}

export function exportJSON(data, fileName)
{
    if (data === [] || data == null)
    {
        alert('No data to export');
        return;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);

    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export function importJSON(file)
{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const jsonObj = JSON.parse(e.target.result);
                resolve(jsonObj);
            } catch (err) {
                reject(new Error('Le fichier sélectionné n\'est pas un fichier JSON valide.'));
            }
        };
        reader.onerror = function() {
            reject(new Error('Erreur lors de la lecture du fichier'));
        };
        reader.readAsText(file);
    });
}