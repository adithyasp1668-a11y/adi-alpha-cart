import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { CartItem } from '@alpha-cart/shared-types';

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totals, setTotals] = useState(mockStore.getCartTotals());
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | 'cod' | 'wallet'>('upi');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const updateCartState = () => {
    setCartItems(mockStore.getCart());
    setTotals(mockStore.getCartTotals());
  };

  useEffect(() => {
    updateCartState();
    return mockStore.subscribe(updateCartState);
  }, []);

  const handleUpdateQty = (productId: string, delta: number) => {
    mockStore.updateCartQuantity(productId, delta);
  };

  const handleToggleSelect = (productId: string) => {
    mockStore.toggleCartItemSelection(productId);
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      const order = mockStore.createOrderFromCart(
        'Rahul Kumar',
        '+91 98765 43210',
        'Flat 402, Raghav Towers, 14th Main, HSR Layout Sector 4, Bengaluru',
        selectedPayment
      );
      setIsPlacingOrder(false);
      setShowCheckoutModal(false);
      router.push({ pathname: '/track/[id]', params: { id: order.orderNumber } });
    }, 800);
  };

  return (
    <View style={styles.container}>
      {/* Header (Exact match to reference mockup) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart ({cartItems.length})</Text>
        <TouchableOpacity onPress={() => mockStore.clearCart()} style={styles.clearBtn}>
          <Text style={styles.clearBtnText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="cart-outline" size={48} color={COLORS.primary} />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add items from Grocery, Food, Fitness or Use & Throw to get started.
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.browseButtonText}>Browse Stores</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Cart Items List */}
            <View style={styles.itemsList}>
              {cartItems.map(({ product, quantity, selected }) => (
                <View key={product.id} style={styles.itemRow}>
                  {/* Selection Checkbox */}
                  <TouchableOpacity
                    style={[styles.checkbox, selected && styles.checkboxActive]}
                    onPress={() => handleToggleSelect(product.id)}
                  >
                    {selected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                  </TouchableOpacity>

                  {/* Product Thumbnail */}
                  <Image source={{ uri: product.image }} style={styles.itemImage} />

                  {/* Product Details */}
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {product.name}
                    </Text>
                    <Text style={styles.itemPrice}>{formatCurrency(product.price)}</Text>
                  </View>

                  {/* Quantity Stepper */}
                  <View style={styles.stepperWrap}>
                    <TouchableOpacity
                      style={styles.stepBtn}
                      onPress={() => handleUpdateQty(product.id, -1)}
                    >
                      <Ionicons name="remove" size={14} color="#1E293B" />
                    </TouchableOpacity>
                    <Text style={styles.stepNumber}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.stepBtn}
                      onPress={() => handleUpdateQty(product.id, 1)}
                    >
                      <Ionicons name="add" size={14} color="#1E293B" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* Promo Code Applied Box */}
            <View style={styles.promoBox}>
              <View style={styles.promoLeft}>
                <Ionicons name="pricetag" size={18} color={COLORS.primary} />
                <View>
                  <Text style={styles.promoTitle}>ALPHAFIRST applied</Text>
                  <Text style={styles.promoSubtitle}>You saved ₹100 with this coupon</Text>
                </View>
              </View>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            </View>

            {/* Delivery Address Preview */}
            <View style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <Ionicons name="home-outline" size={18} color={COLORS.primary} />
                <Text style={styles.addressLabel}>Delivering to Home</Text>
              </View>
              <Text style={styles.addressBody}>
                Flat 402, Raghav Towers, 14th Main, HSR Layout Sector 4, Bengaluru
              </Text>
            </View>

            {/* Bill Details (Exact match to reference mockup) */}
            <View style={styles.billDetailsCard}>
              <Text style={styles.billTitle}>Bill Details</Text>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Item Total</Text>
                <Text style={styles.billValue}>{formatCurrency(totals.itemTotal)}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={styles.billValue}>{formatCurrency(totals.deliveryFee)}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabelDiscount}>Discount</Text>
                <Text style={styles.billValueDiscount}>-{formatCurrency(totals.discount)}</Text>
              </View>

              <View style={styles.billDivider} />

              <View style={styles.billRowTotal}>
                <Text style={styles.totalLabel}>To Pay</Text>
                <Text style={styles.totalValue}>{formatCurrency(totals.toPay)}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Sticky Bottom Bar */}
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.checkoutBtn}
              activeOpacity={0.88}
              onPress={() => setShowCheckoutModal(true)}
            >
              <Ionicons name="cart" size={20} color="#FFFFFF" />
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Checkout Options Modal */}
      <Modal visible={showCheckoutModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Payment Method</Text>
              <TouchableOpacity onPress={() => setShowCheckoutModal(false)}>
                <Ionicons name="close" size={22} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <View style={styles.paymentOptions}>
              <TouchableOpacity
                style={[
                  styles.paymentOptionCard,
                  selectedPayment === 'upi' && styles.paymentOptionActive,
                ]}
                onPress={() => setSelectedPayment('upi')}
              >
                <Ionicons name="phone-portrait-outline" size={20} color={COLORS.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.paymentName}>UPI (Google Pay, PhonePe, Paytm)</Text>
                  <Text style={styles.paymentSub}>Instant and secure payment</Text>
                </View>
                <Ionicons
                  name={selectedPayment === 'upi' ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={selectedPayment === 'upi' ? COLORS.primary : '#94A3B8'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentOptionCard,
                  selectedPayment === 'card' && styles.paymentOptionActive,
                ]}
                onPress={() => setSelectedPayment('card')}
              >
                <Ionicons name="card-outline" size={20} color={COLORS.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.paymentName}>Credit / Debit Card</Text>
                  <Text style={styles.paymentSub}>Visa, Mastercard, RuPay</Text>
                </View>
                <Ionicons
                  name={selectedPayment === 'card' ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={selectedPayment === 'card' ? COLORS.primary : '#94A3B8'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentOptionCard,
                  selectedPayment === 'cod' && styles.paymentOptionActive,
                ]}
                onPress={() => setSelectedPayment('cod')}
              >
                <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.paymentName}>Cash on Delivery (COD)</Text>
                  <Text style={styles.paymentSub}>Pay at doorstep</Text>
                </View>
                <Ionicons
                  name={selectedPayment === 'cod' ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={selectedPayment === 'cod' ? COLORS.primary : '#94A3B8'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.orderSummaryBar}>
              <View>
                <Text style={styles.summaryLabel}>Total Payable</Text>
                <Text style={styles.summaryAmount}>{formatCurrency(totals.toPay)}</Text>
              </View>

              <TouchableOpacity
                style={styles.confirmOrderBtn}
                onPress={handlePlaceOrder}
                disabled={isPlacingOrder}
              >
                <Text style={styles.confirmOrderText}>
                  {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  clearBtn: {
    padding: 4,
  },
  clearBtnText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
    gap: 16,
  },
  itemsList: {
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
  },
  itemDetails: {
    flex: 1,
    gap: 2,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#334155',
  },
  stepperWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 2,
    gap: 8,
    backgroundColor: '#F8FAFC',
  },
  stepBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    minWidth: 16,
    textAlign: 'center',
  },
  promoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: 14,
    padding: 14,
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  promoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  promoSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  addressCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addressLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  addressBody: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  billDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  billTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  billValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  billLabelDiscount: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  billValueDiscount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  billRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
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
  checkoutBtn: {
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
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 26,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  browseButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 8,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  paymentOptions: {
    gap: 12,
  },
  paymentOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  paymentOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF7ED',
  },
  paymentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  paymentSub: {
    fontSize: 11,
    color: '#64748B',
  },
  orderSummaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  confirmOrderBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  confirmOrderText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
