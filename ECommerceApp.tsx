import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Plus, Minus, XCircle, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Mock product data (replace with your actual data source)
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const initialProducts: Product[] = [
    {
        id: '1',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 25.99,
        imageUrl: 'https://media.istockphoto.com/id/517081132/photo/funny-little-girl-giving-thumbs-up.jpg?s=612x612&w=0&k=20&c=1CDD80fZCq2tyxTv8oqg6bAkGQaB9TBlbyhb0-Qv1Hs=', // Replace with actual image URLs
    },
    {
        id: '2',
        name: 'Product 2',
        description: 'Description for Product 2',
        price: 19.99,
        imageUrl: 'https://media.istockphoto.com/id/1212783534/photo/studio-portrait-of-a-young-girl-on-white-background-giving-thumbs-up-while-while-smiling-and.jpg?s=612x612&w=0&k=20&c=jwNOZh5zTNK5RZIo7nKz6enIw_OKW-_u6Td46tdnVos=',
    },
    {
        id: '3',
        name: 'Product 3',
        description: 'Description for Product 3',
        price: 32.50,
        imageUrl: 'https://img.freepik.com/free-photo/little-young-caucasian-boy-nature-childhood_158595-2550.jpg',
    },
    {
        id: '4',
        name: 'Product 4',
        description: 'Description for Product 4',
        price: 15.00,
        imageUrl: 'https://images.unsplash.com/photo-1627639679638-8485316a4b21?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGtpZHxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
        id: '5',
        name: 'Product 5',
        description: 'Another product example',
        price: 45.00,
        imageUrl: 'https://www.shutterstock.com/image-photo/adorable-little-girl-playing-wheat-260nw-109410998.jpg',
    }
];

// Cart item interface
interface CartItem {
    product: Product;
    quantity: number;
}

// Animation variants
const cartItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
};

const CheckoutPage = ({ cartItems, onClearCart, onCheckout }: { cartItems: CartItem[], onClearCart: () => void, onCheckout: (items: CartItem[]) => void }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const handleCheckoutProcess = async () => {
        setIsProcessing(true);
        setError(null);
        // Simulate an async operation (e.g., sending data to a server)
        try {
            // Replace this with your actual checkout logic (e.g., API call)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate a successful order
            if (cartItems.length > 0) {
                setOrderComplete(true);
                onCheckout(cartItems); // Notify parent component
                onClearCart(); // Clear the cart
            } else {
                setError("Your cart is empty.");
            }

        } catch (err: any) {
            setError(err.message || "An error occurred during checkout.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="flex flex-col items-center justify-center p-4">
                <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order Completed!</h2>
                <p className="text-gray-600 mb-8 text-center">Thank you for your purchase. Your order has been processed successfully.</p>
                <Button onClick={() => setOrderComplete(false)} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
                    Continue Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

            {cartItems.length === 0 ? (
                <div className="text-gray-500">Your cart is empty.</div>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.product.id} className="flex items-center justify-between border-b pb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-gray-700">Price: ${item.product.price.toFixed(2)}</p>
                            </div>
                            <p className="text-xl font-bold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <h2 className="text-2xl font-semibold text-gray-900">Total:</h2>
                        <p className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <Button
                        onClick={handleCheckoutProcess}
                        disabled={isProcessing}
                        className={cn(
                            "w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors duration-200",
                            isProcessing && "opacity-70 cursor-not-allowed"
                        )}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Place Order"
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};

const ShoppingCartPage = ({
    cartItems,
    onUpdateQuantity,
    onRemoveFromCart,
    onClearCart,
    onGoToCheckout
}: {
    cartItems: CartItem[],
    onUpdateQuantity: (productId: string, quantity: number) => void,
    onRemoveFromCart: (productId: string) => void,
    onClearCart: () => void,
    onGoToCheckout: () => void
}) => {
    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-gray-500">Your cart is empty.</div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {cartItems.map((item) => (
                            <motion.div
                                key={item.product.id}
                                variants={cartItemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex items-center justify-between border-b pb-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                                        <p className="text-gray-700">Price: ${item.product.price.toFixed(2)}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className="hover:bg-gray-100"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="text-gray-900 font-semibold">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                                className="hover:bg-gray-100"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-xl font-bold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onRemoveFromCart(item.product.id)}
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        <XCircle className="h-5 w-5" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div className="flex justify-between items-center mt-4">
                        <h2 className="text-2xl font-semibold text-gray-900">Total:</h2>
                        <p className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            onClick={onClearCart}
                            disabled={cartItems.length === 0}
                            className="bg-red-500/20 text-red-500 hover:bg-red-500/30 hover:text-red-400 px-6 py-2 rounded-md transition-colors duration-200"
                        >
                            Clear Cart
                        </Button>
                        <Button
                            onClick={onGoToCheckout}
                            disabled={cartItems.length === 0}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-200"
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProductCard = ({ product, onAddToCart }: { product: Product, onAddToCart: (product: Product) => void }) => {
    return (
        <Card className="group overflow-hidden">
            <div className="relative">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                        onClick={() => onAddToCart(product)}
                        className="bg-blue-500/90 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                    </Button>
                </div>
            </div>
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">{product.name}</CardTitle>
                <CardDescription className="text-gray-500">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
            </CardContent>
        </Card>
    );
};

const ECommerceApp = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cartItems');
            try {
                return savedCart ? JSON.parse(savedCart) : [];
            } catch (error) {
                console.error('Error parsing cart items from localStorage:', error);
                return [];
            }
        }
        return [];
    });
    const [view, setView] = useState<'home' | 'cart' | 'checkout'>('home');

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const handleAddToCart = (product: Product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { product, quantity: 1 }];
            }
        });
        // Optionally, provide user feedback (e.g., a toast notification)
    };

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveFromCart(productId);
            return;
        }
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const handleRemoveFromCart = (productId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    const handleGoToCheckout = () => {
        setView('checkout');
    };

    const handleCheckout = (items: CartItem[]) => {
        // In a real application, you would send this data to your server
        console.log('Checkout with items:', items);
        // For this example, we'll just clear the cart and show a success message
        setCartItems([]);
        setView('home'); // Go back to home after checkout
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-md py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">E-Commerce Store</h1>
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={() => setView('home')}
                            className={cn(
                                "hover:bg-gray-100",
                                view === 'home' && 'bg-gray-100'
                            )}
                        >
                            Home
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setView('cart')}
                            className={cn(
                                "hover:bg-gray-100 relative",
                                view === 'cart' && 'bg-gray-100'
                            )}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5 min-w-[16px] text-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {view === 'home' && (
                    <div className="container mx-auto p-4">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                            ))}
                        </div>
                    </div>
                )}
                {view === 'cart' && (
                    <ShoppingCartPage
                        cartItems={cartItems}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveFromCart={handleRemoveFromCart}
                        onClearCart={handleClearCart}
                        onGoToCheckout={handleGoToCheckout}
                    />
                )}
                {view === 'checkout' && (
                    <CheckoutPage cartItems={cartItems} onClearCart={handleClearCart} onCheckout={handleCheckout} />
                )}
            </main>

            <footer className="bg-gray-800 text-white py-4 mt-8">
                <div className="container mx-auto text-center">
                    &copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default ECommerceApp;
