document.addEventListener('DOMContentLoaded', () => {
    const priceForm = document.getElementById('price-form');
    const priceTableBody = document.querySelector('#price-table tbody');
    let porkChart;

    // 取得資料並渲染
    const fetchData = async () => {
        try {
            const response = await fetch('/api/prices');
            const data = await response.json();
            renderTable(data);
            renderChart(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 渲染表格
    const renderTable = (data) => {
        priceTableBody.innerHTML = '';
        // 倒序顯示，讓最新的年份在上面
        const sortedData = [...data].sort((a, b) => b.year - a.year);
        sortedData.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>民國 ${item.year} 年</td>
                <td>${item.price.toFixed(2)}</td>
            `;
            priceTableBody.appendChild(tr);
        });
    };

    // 渲染圖表
    const renderChart = (data) => {
        const ctx = document.getElementById('porkChart').getContext('2d');
        
        const labels = data.map(item => `民國 ${item.year} 年`);
        const prices = data.map(item => item.price);

        if (porkChart) {
            porkChart.destroy();
        }

        porkChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '毛豬市場拍賣價格 (元/公斤)',
                    data: prices,
                    borderColor: '#d32f2f',
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                return `價格: ${context.parsed.y} 元/公斤`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: '元/公斤'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '年份'
                        }
                    }
                }
            }
        });
    };

    // 表單送出處理
    priceForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const year = document.getElementById('year').value;
        const price = document.getElementById('price').value;

        try {
            const response = await fetch('/api/prices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ year: parseInt(year), price: parseFloat(price) })
            });

            if (response.ok) {
                alert('資料儲存成功！');
                priceForm.reset();
                fetchData(); // 重新整理資料
            } else {
                alert('儲存失敗，請檢查輸入內容。');
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    });

    // 初始載入
    fetchData();
});
