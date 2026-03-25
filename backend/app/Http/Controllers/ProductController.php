<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::select('name', 'price', 'stock')->get();

        return response()->json([
            'data' => $products
        ]);
    }

    public function show($id): JsonResponse
    {
        $product = Product::select('name', 'price', 'stock')->findOrFail($id);

        return response()->json([
            'data' => $product
        ]);
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = Product::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Successfully created product',
            'data' => $product
        ]);
    }

    public function update(StoreProductRequest $request): JsonResponse
    {
        $product = Product::findOrFail(i);

        return response()->json([
            'success' => true,
            'message' => 'Successfully created product',
            'data' => $product
        ]);
    }
}
