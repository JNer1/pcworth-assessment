<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::select('name', 'price', 'stock')->get();

        return response()->json([
            'data' => $products
        ]);
    }

    public function getProduct($id): JsonResponse
    {
        $product = Product::select('name', 'price', 'stock')->findOrFail($id);

        return response()->json([
            'data' => $product
        ]);
    }
}
