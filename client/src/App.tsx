
import { Button } from '@/components/ui/button';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Button 
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-colors duration-200"
          onClick={() => {
            // Button does nothing when clicked
          }}
        >
          Click Here
        </Button>
      </div>
    </div>
  );
}

export default App;
