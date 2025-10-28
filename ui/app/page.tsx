export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            JSON Tree Visualizer
          </h1>
          <p className="text-muted-foreground">
            Visualize and explore JSON data as interactive tree structures
          </p>
        </header>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <p className="text-center text-muted-foreground">
              Project setup complete. Components will be added in next branches.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
