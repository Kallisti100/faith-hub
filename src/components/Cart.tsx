import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';

export default function Cart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-primary bg-opacity-80 z-50"
        onClick={actions.closeCart}
      />

      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-bordersubtle z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-bordersubtle">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="text-secondary" size={24} />
            <h2 className="font-heading text-2xl text-primary-foreground">
              Your Cart
            </h2>
          </div>
          <button
            onClick={actions.closeCart}
            className="text-textbody hover:text-primary-foreground transition-colors"
            aria-label="Close cart"
          >
            <X size={28} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto mb-4 text-secondary opacity-50" size={64} />
              <p className="font-paragraph text-lg text-textbody">
                Your cart is empty
              </p>
              <p className="font-paragraph text-sm text-textbody mt-2">
                Add donations to support our ministry
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-primary border border-bordersubtle rounded-lg p-4"
                >
                  <div className="flex space-x-4">
                    {item.image && (
                      <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg text-primary-foreground mb-2 truncate">
                        {item.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center bg-background border border-bordersubtle rounded text-textbody hover:text-primary-foreground transition-colors"
                          >
                            -
                          </button>
                          <span className="font-paragraph text-base text-textbody w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-background border border-bordersubtle rounded text-textbody hover:text-primary-foreground transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => actions.removeFromCart(item)}
                          className="text-destructive hover:text-destructiveforeground transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      
                      <p className="font-paragraph text-base text-secondary mt-2">
                        {formatPrice(item.price * item.quantity, currency ?? DEFAULT_CURRENCY)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-bordersubtle p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xl text-primary-foreground">
                Total
              </span>
              <span className="font-heading text-2xl text-secondary">
                {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
              </span>
            </div>
            
            <Button
              onClick={actions.checkout}
              disabled={isCheckingOut}
              className="w-full bg-buttonbackground text-buttonforeground hover:opacity-90 font-paragraph text-lg py-6 rounded-lg"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
            
            <button
              onClick={actions.clearCart}
              className="w-full text-textbody hover:text-primary-foreground transition-colors font-paragraph text-sm"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
