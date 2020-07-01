from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.http import StreamingHttpResponse
from django.http import JsonResponse
import random
from django.http import HttpResponseRedirect
from django.contrib import messages
from .forms import sudokuBoardForm
from django.shortcuts import redirect
from .models import Project, Tools
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

def index(request):
    projects = Project.objects.all().prefetch_related('tools_set')
    context = {
        'projects': projects,
    }
    return render(request, 'home.html', context)

def sorting(request):
    array = []
    i = 0
    while i < 150:
        x = random.randint(10, 500)
        if (not(x in array)):
            array.append(x)
            i = i+1
    context = {
        'bars': array,
        'size': len(array),
    }
    return render(request, 'sorting.html', context)

def isPossible(board, row, index, num):
    for k in range(9):
        if (k != index and board[row][k] == num):
            return False
    for j in range(9):
        if (j != row and board[j][index] == num):
            return False
    blockRow = 3*(row//3)
    blockColumn = 3*(index//3)
    for i in range(3):
        for m in range(3):
            if ((index != blockColumn+m and row != blockRow+i) and board[blockRow+i][blockColumn+m] == num):
                return False
    return True

def solveBoard(board, row, index):
    if (row == 9):
        return True
    elif (board[row][index] == 0):
        for i in range(1, 10):
            if (isPossible(board, row, index, i)):
                board[row][index] = i
                index+=1
                if (index == 9):
                    row+=1
                    index = 0
                if(solveBoard(board, row, index)):
                    return True
                else:
                    index-=1
                    if (index < 0):
                        row-=1
                        index = 8
                    board[row][index] = 0
    elif (not isPossible(board, row, index, board[row][index])):
        return False
    else:
        index+=1
        if (index == 9):
            row+=1
            index = 0
        if(solveBoard(board, row, index)):
            return True
    return False

def solve(board):
    if (solveBoard(board, 0, 0)):
        return True
    else:
        # raise Exception("not working")
        return False

def sudoku(request):
    board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    if (request.method == 'POST'):
        data = request.POST
        valid = True
        empty = True
        for i in range(9):
            row = []
            for j in range(9):
                index = '{}{}'.format(str(i), str(j))
                value = data[index]
                if (value != ''):
                    try:
                       val = int(value)
                    except ValueError:
                       valid = False
                    board[i][j] = int(value[0])
                    empty = False
        if (empty):
            valid = False
            messages.add_message(request, messages.ERROR, "The board is empty!")
        # raise Exception(board)
        if (valid):
            if (solve(board)):
                context = {
                'values': board,
                'solved': True,
                }
                return render(request, 'sudoku.html', context)
            else:
                messages.add_message(request, messages.ERROR, "There is no solution!")
                context = {
                'values': board,
                'solved': False,
                }
                return render(request, 'sudoku.html', context)
                # raise Exception(data)
                # return redirect("sudoku")
        else:
            if (not empty):
                messages.add_message(request, messages.ERROR, "Invalid Inputs!")
            context = {
                'values': board,
                'solved': False,
            }
            return render(request, 'sudoku.html', context)
    context = {
        'values': board,
        'solved': False,
    }
    return render(request, 'sudoku.html', context)

def solveSudoku(request):
    board = []
    data = request.POST
    # raise Exception(index)
    for i in range(9):
        row = []
        for j in range(9):
            index = '{i}'+'{j}'
            value = data.get[index]
            if (value.length() == 1):
                row.append(value)
            else:
                return render_to_response('sudoku.html', message='Invalid Inputs')
        board.append(row)
    context = {
        'values': board,
    }
    return HttpResponseRedirect(request, 'sudoku.html', context)
