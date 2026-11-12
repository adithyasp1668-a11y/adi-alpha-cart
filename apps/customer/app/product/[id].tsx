import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { Product } from '@alpha-cart/shared-types';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      const prod = mockStore.getProductById(id || 'prod-mb-whey-1kg');
      setProduct(prod);
    };
    fetchProduct();
    return mockStore.subscribe(fetchProduct);
  }, [id]);

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = () => {
    mockStore.addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#EF4444' : '#0F172A'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => router.push('/(tabs)/cart')}
          >
            <Ionicons name="cart-outline" size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Product Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
          {product.discountPercent ? (
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>{product.discountPercent}% OFF</Text>
            </View>
          ) : null}
        </View>

        {/* Product Info Section (Exact match to reference mockup) */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product.name}</Text>

          <View style={styles.ratingRow}>
            <View style={styles.stars}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.ratingScore}>{product.rating}</Text>
            </View>
            <Text style={styles.reviewCount}>({product.reviewCount.toLocaleString()} reviews)</Text>
            <View style={styles.verifiedStoreBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#10B981" />
              <Text style={styles.verifiedStoreText}>{product.shopName}</Text>
            </View>
          </View>

          {/* Pricing Row */}
          <View style={styles.pricingRow}>
            <Text style={styles.currentPrice}>{formatCurrency(product.price)}</Text>
            {product.originalPrice ? (
              <Text style={styles.oldPrice}>{formatCurrency(product.originalPrice)}</Text>
            ) : null}
            {product.discountPercent ? (
              <View style={styles.greenDiscountPill}>
                <Text style={styles.greenDiscountText}>{product.discountPercent}% OFF</Text>
              </View>
            ) : null}
          </View>

          {/* Key Nutritional / Feature Badges (Exact match to Image 1) */}
          {product.nutritionInfo && (
            <View style={styles.nutritionRow}>
              {product.nutritionInfo.protein && (
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionVal}>{product.nutritionInfo.protein}</Text>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                </View>
              )}
              {product.nutritionInfo.bcaas && (
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionVal}>{product.nutritionInfo.bcaas}</Text>
                  <Text style={styles.nutritionLabel}>BCAAs</Text>
                </View>
              )}
              {product.nutritionInfo.servings && (
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionVal}>{product.nutritionInfo.servings}</Text>
                  <Text style={styles.nutritionLabel}>Servings</Text>
                </View>
              )}
            </View>
          )}

          {/* Availability Alert */}
          {!product.isAvailable && (
            <View style={styles.unavailableBox}>
              <Ionicons name="alert-circle" size={18} color="#EF4444" />
              <Text style={styles.unavailableText}>
                Currently unavailable at nearby partner stores.
              </Text>
            </View>
          )}

          {/* Description */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Product Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          {/* Quantity Controls */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.stepperContainer}>
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Ionicons name="remove" size={18} color="#1E293B" />
              </TouchableOpacity>
              <Text style={styles.quantityNumber}>{quantity}</Text>
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => setQuantity((q) => q + 1)}
              >
                <Ionicons name="add" size={18} color="#1E293B" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Added Toast */}
      {addedNotice && (
        <View style={styles.toast}>
          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
          <Text style={styles.toastText}>Added to Cart!</Text>
        </View>
      )}

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.addToCartBtn,
            !product.isAvailable && styles.addToCartBtnDisabled,
          ]}
          disabled={!product.isAvailable}
          activeOpacity={0.88}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" size={20} color="#FFFFFF" />
          <Text style={styles.addToCartText}>
            {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#64748B',
  },
  backButton: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    height: 280,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  detailsContainer: {
    padding: 20,
    gap: 16,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 30,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingScore: {
    fontSize: 13,
    fontWeight: '800',
    color: '#B45309',
  },
  reviewCount: {
    fontSize: 13,
    color: '#64748B',
  },
  verifiedStoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  verifiedStoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  currentPrice: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },
  oldPrice: {
    fontSize: 18,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  greenDiscountPill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  greenDiscountText: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: '800',
  },
  nutritionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  nutritionCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 12,
    alignItems: 'center',
    gap: 2,
  },
  nutritionVal: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  unavailableBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 12,
  },
  unavailableText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionBlock: {
    gap: 6,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  descriptionText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  quantityLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 4,
    gap: 16,
  },
  stepperBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    minWidth: 20,
    textAlign: 'center',
  },
  toast: {
    position: 'absolute',
    bottom: 84,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  toastText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  addToCartBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addToCartBtnDisabled: {
    backgroundColor: '#CBD5E1',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
