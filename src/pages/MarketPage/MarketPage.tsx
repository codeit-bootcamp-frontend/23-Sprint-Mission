import BestItemsSection from './components/BestItemsSection';
import AllItemsSection from './components/AllItemsSection';
import { Container } from '../../styles/Common';


const MarketPage: React.FC = () => {
    return (
        <Container>
            <BestItemsSection />
            <AllItemsSection />
        </Container>
    )
}

export default MarketPage;