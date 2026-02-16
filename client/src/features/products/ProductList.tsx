import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { ProductCard } from "../../components/ProductCard";
import { Spinner } from "@fluentui/react-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
`;

export const ProductList = () => {
  const { filtered, loading } = useAppSelector((state) => state.products);

  if (loading) return <Spinner label="Loading products..." />;

  if (filtered.length === 0) {
    return (
      <NoProducts>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search</p>
      </NoProducts>
    );
  }

  return (
    <Grid>
      {filtered.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};