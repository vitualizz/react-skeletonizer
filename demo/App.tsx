import { useState } from 'react'
import { Skeletonizer } from 'react-skeletonizer'

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const sampleContent = (
    <div>
      <h1>Welcome to React Skeletonizer</h1>
      <img src="https://placekittens.com/200/200" alt="Sample" width={300} height={200} />
      <p>This is a paragraph with some text content that will be converted to skeleton loaders.</p>
      <h2>Features</h2>
      <p>
        The library automatically generates skeleton loaders for different types of content.
        It supports text, images, headings, and buttons.
      </p>
      <div>
        <h3>Nested Content</h3>
        <span>This is a span element</span>
        <button>Click me</button>
      </div>
      <h4>Another heading</h4>
      <p>More content here with multiple lines of text to demonstrate the skeleton generation.</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-6 flex items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">React Skeletonizer Demo</h1>
        <button
          onClick={() => setLoading(!loading)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {loading ? 'Show Content' : 'Show Skeleton'}
        </button>
      </div>

      <div className="border rounded-lg p-6 bg-gray-50 min-h-96">
        <Skeletonizer loading={loading}>
          {sampleContent}
        </Skeletonizer>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
        <pre className="text-sm text-blue-800 bg-blue-100 p-3 rounded overflow-x-auto">
{`import { Skeletonizer, useSkeletonTree } from 'react-skeletonizer';

// Basic usage
<Skeletonizer loading={isLoading}>
<YourContent />
</Skeletonizer>

// With metadata hook
const { nodes, totalDepth, nodeCount } = useSkeletonTree(children);`}
        </pre>
      </div>
    </div>
  );
};

export default App
