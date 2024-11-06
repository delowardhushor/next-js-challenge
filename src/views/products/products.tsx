"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { useRouter, useSearchParams } from 'next/navigation'

export const Products: React.FC = () => {
  const router = useRouter()

  let searchParams = useSearchParams();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  const handleOpenModal = useCallback((product: Product) => {
    
    router.replace(`/products?active=${product.id}`) // Navigate to product page with product id as parameter
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    window.history.replaceState(null, '', '/products')
  }, []);

  useEffect(() => {

    const activeProduct = searchParams.get('active')

    if(activeProduct && paginatedProducts?.length > 0){
      let ProData = paginatedProducts?.find(ele => ele?.id == activeProduct)
      ProData ? setSelectedProduct(ProData) : null
    }else{
      handleCloseModal()
    }

  }, [searchParams, paginatedProducts])

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
