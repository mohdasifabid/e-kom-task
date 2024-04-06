import { BASE_URL } from "../lib/utils";
import { Layout } from "../ui/appLayout";

const Home = () => {
  if (!BASE_URL) {
    return null;
  }
  return (
    <Layout>
      <div className="flex flex-col h-40">
        <div className="flex-grow">
          <p className="text-4xl font-bold mb-4 pt-4">Home</p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
